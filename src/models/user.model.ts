import { RowDataPacket } from 'mysql2';

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
} & RowDataPacket;

export default User;
