import { app } from './app';
import { config } from './config';
import { connectDatabase } from './config/db';

async function bootstrap() {
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`🚀 Hendrix Cargo & Logistics Server Running!`);
    console.log(`📡 URL: http://localhost:${config.port}`);
    console.log(`🏥 Health Check: http://localhost:${config.port}/health`);
    console.log(`📦 Tracking Endpoint: http://localhost:${config.port}/api/track/:number`);
    console.log(`🔐 Admin Portal: http://localhost:${config.port}/admin`);
    console.log(`⚙️  Environment: ${config.nodeEnv}`);
    console.log(`====================================================`);
  });

  const handleShutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

bootstrap().catch((error) => {
  console.error('Fatal bootstrap error:', error);
  process.exit(1);
});
