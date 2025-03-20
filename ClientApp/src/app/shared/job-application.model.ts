import { JobApplicationStatus } from "./enums"

export class JobApplication {
    id: number = 0
    companyName: string = ''
    position: string = ''
    status: JobApplicationStatus | null = null
    dateApplied: string = ''
}
