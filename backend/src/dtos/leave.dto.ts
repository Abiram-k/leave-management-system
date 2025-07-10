import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class LeaveDto {
  @IsNumber()
  leaveType!: string;

  @IsDateString({}, { message: "Start date must be a valid ISO date" })
  startDate!: string;

  @IsDateString({}, { message: "End date must be a valid ISO date" })
  endDate!: string;

  @IsString()
  @Length(5, 255, {
    message: "Reason must be between 5 and 255 characters",
  })
  reason!: string;
}

export type leaveReqType = {
  leaveType: number;
  startDate: Date;
  endDate: Date;
  reason: string;
};
