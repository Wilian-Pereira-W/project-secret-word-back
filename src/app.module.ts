import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [UserModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
