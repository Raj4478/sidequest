import { ResolutionCategory } from '../entities/resolution.entity';
export declare class CreateResolutionDto {
    title: string;
    description?: string;
    category: ResolutionCategory;
    start_date: string;
    end_date: string;
}
declare const UpdateResolutionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateResolutionDto>>;
export declare class UpdateResolutionDto extends UpdateResolutionDto_base {
}
export {};
