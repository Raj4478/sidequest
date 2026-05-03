import { ReflectionMood } from '../entities/reflection.entity';
export declare class CreateReflectionDto {
    wins?: string;
    blockers?: string;
    next_steps?: string;
    mood?: ReflectionMood;
}
declare const UpdateReflectionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReflectionDto>>;
export declare class UpdateReflectionDto extends UpdateReflectionDto_base {
}
export {};
