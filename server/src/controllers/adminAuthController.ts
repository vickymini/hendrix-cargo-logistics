import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { comparePassword, generateToken } from '../services/authService';
import { logAdminAction } from '../services/auditService';
import { config } from '../config';

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail.toLowerCase() },
        ],
      },
    });

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials or inactive administrator account.',
      });
      return;
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials or inactive administrator account.',
      });
      return;
    }

    // Update last login
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokenPayload = {
      adminId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(tokenPayload);

    // Record audit log
    await logAdminAction({
      adminId: user.id,
      adminName: user.fullName || user.username,
      action: 'ADMIN_LOGIN',
      targetType: 'AUTH',
      targetId: user.id,
      details: { username: user.username, email: user.email },
      req,
    });

    // Set HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      admin: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred during authentication.',
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  if (req.admin) {
    await logAdminAction({
      adminId: req.admin.adminId,
      adminName: req.admin.username,
      action: 'ADMIN_LOGOUT',
      targetType: 'AUTH',
      targetId: req.admin.adminId,
      details: { username: req.admin.username },
      req,
    });
  }

  res.clearCookie('admin_token');
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: req.admin.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        role: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'Administrator user not found' });
      return;
    }

    res.json({
      success: true,
      admin: user,
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ success: false, error: 'Failed to verify session' });
  }
}
