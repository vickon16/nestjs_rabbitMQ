import { AuthGuard } from '@nestjs/passport';

export default class JwtAuthPassportGuard extends AuthGuard('jwt') {}
