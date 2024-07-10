import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { ResponseBuilder } from 'type';

export const RoleGuard = (roles: string[]) => {
    class RoleGuardMixin implements CanActivate {
        responseBuilder = new ResponseBuilder();

        async canActivate(context: ExecutionContext) {
            try {
                const request = context.switchToHttp().getRequest();
                const user = request.user;

                console.log(user);

                if (!user || !roles.includes(user.role)) {
                    return this.responseBuilder
                        .errorWithoutData('Unauthorized')
                        .code(401)
                        .throw();
                }

                return true;
            } catch (error) {
                return this.responseBuilder
                    .errorWithoutData('Unauthorized')
                    .code(401)
                    .throw();
            }
        }
    }

    return mixin(RoleGuardMixin);
};
