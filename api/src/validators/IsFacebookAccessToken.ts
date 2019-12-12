import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import * as superAgent from 'superagent';

@ValidatorConstraint({ async: true })
class IsFacebookAccessTokenConstraint implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    console.error(value);
    const url = 'https://graph.facebook.com/debug_token';

    try {
      const response = await superAgent.get(url).query({
        input_token: value,
        access_token: process.env.FACEBOOK_APP_ACCESS_TOKEN,
      });
      const responseBody = JSON.parse(response.text);

      return responseBody.data.is_valid;
    } catch (e) {
      return false;
    }
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Provided access token is not a valid Facebook access token';
  }
}

export default function IsFacebookAccessToken(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function(object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isFacebookAccessToken',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFacebookAccessTokenConstraint,
    });
  };
}
