export class ReportCreateWrapper {
    reason?: string;
    message?: string;
    imageId?: string;
}

export class ReportUpdateWrapper {
    public imageId?: string;
    public reason?: string;
    public resolved?: boolean;
}
