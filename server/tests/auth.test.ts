import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../src/services/authService';

describe('Authentication & Cryptography Unit Tests', () => {
  it('hashes passwords securely and verifies correctly', async () => {
    const raw = 'SecureSecretPassword2026!';
    const hash = await hashPassword(raw);

    expect(hash).not.toBe(raw);
    expect(hash.startsWith('$2')).toBe(true);

    const match = await comparePassword(raw, hash);
    expect(match).toBe(true);

    const wrongMatch = await comparePassword('WrongPassword', hash);
    expect(wrongMatch).toBe(false);
  });

  it('generates and verifies valid JWT admin tokens', () => {
    const payload = {
      adminId: 'admin-uuid-1234',
      username: 'hendrix_admin',
      email: 'admin@hendrixcargo.com',
      role: 'superadmin',
    };

    const token = generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);

    const verified = verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.adminId).toBe('admin-uuid-1234');
    expect(verified?.username).toBe('hendrix_admin');
    expect(verified?.role).toBe('superadmin');
  });

  it('rejects tampered or malformed tokens', () => {
    const invalid = verifyToken('tampered.jwt.token');
    expect(invalid).toBeNull();
  });
});
