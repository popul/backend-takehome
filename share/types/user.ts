export class User {
  uid!: string;
  timeZone!: string;
}

export class UserTaskData extends User {
  scheduledDate!: string;
}