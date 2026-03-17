// import hàm registerAs từ package @nestjs/config
// hàm này dùng để tạo 1 "nhóm cấu hình" (configuration namespace)
import { registerAs } from '@nestjs/config';
import { join } from 'path';
export default registerAs('database', () => ({
  // loại database mà TypeORM sẽ kết nối
  // ở đây là PostgreSQL
  type: 'postgres',

  // lấy DATABASE_URL từ biến môi trường (.env)
  // process.env là object chứa tất cả biến môi trường
  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  // tự động load tất cả entity trong project
  // giúp bạn không cần khai báo entities: [User, Role,...]
  /* autoLoadEntities: true, */

  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],

  // tự động tạo hoặc cập nhật table theo entity
  // chỉ nên dùng khi development
  // production thường để false
  synchronize: true,
}));
