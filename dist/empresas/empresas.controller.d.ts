import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
export declare class EmpresasController {
    private readonly empresasService;
    constructor(empresasService: EmpresasService);
    create(createEmpresaDto: CreateEmpresaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEmpresaDto: UpdateEmpresaDto): string;
    remove(id: string): string;
}
