import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
export declare class EmpresasService {
    create(createEmpresaDto: CreateEmpresaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmpresaDto: UpdateEmpresaDto): string;
    remove(id: number): string;
}
