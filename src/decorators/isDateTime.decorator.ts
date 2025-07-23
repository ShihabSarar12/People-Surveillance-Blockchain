import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

const dateTimeRegex =
    /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

const IsDateTime = (validationOptions?: ValidationOptions) => {
    return function (object: object, propertyName: string): void {
        registerDecorator({
            name: 'IsDateTime',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return (
                        typeof value === 'string' && dateTimeRegex.test(value)
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid DateTime format (YYYY-MM-DDTHH:mm:ss)`;
                },
            },
        });
    };
};

export default IsDateTime;
