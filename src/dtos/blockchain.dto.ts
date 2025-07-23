import {
    IsString,
    IsEmail,
    Length,
    IsDateString,
    IsStrongPassword,
    IsNotEmpty,
} from 'class-validator';
import IsDateTime from '../decorators/isDateTime.decorator';

class CreateUserDTO {
    @IsString()
    @Length(3, 50)
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @Length(6, 100)
    @IsStrongPassword()
    password!: string;

    @IsDateTime()
    eventTime!: string;

    @IsDateString()
    eventDate!: string;
}

export default CreateUserDTO;
