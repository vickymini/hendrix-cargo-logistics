import { prisma } from '../config/db';
import { hashPassword } from '../services/authService';
import { config } from '../config';

async function seedAdmin() {
  console.log('--- Initializing Administrator Account ---');

  // Accept CLI args: tsx seedAdmin.ts [username] [email] [password]
  const args = process.argv.slice(2);
  const username = args[0] || config.initialAdmin.username;
  const email = args[1] || config.initialAdmin.email;
  const password = args[2] || config.initialAdmin.password;

  if (!password || password.length < 8) {
    console.error('Error: Administrator password must be at least 8 characters long.');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: {
      email,
      passwordHash,
      isActive: true,
      role: 'superadmin',
    },
    create: {
      username,
      email,
      passwordHash,
      fullName: 'System Administrator',
      role: 'superadmin',
      isActive: true,
    },
  });

  console.log('✅ Administrator account ready:');
  console.log(`   ID:       ${admin.id}`);
  console.log(`   Username: ${admin.username}`);
  console.log(`   Email:    ${admin.email}`);
  console.log(`   Role:     ${admin.role}`);
  console.log(`\nYou can now log in at http://localhost:${config.port}/admin with your credentials.`);

  await prisma.$disconnect();
}

seedAdmin().catch((err) => {
  console.error('Failed to seed administrator:', err);
  process.exit(1);
});
