import handlebars from 'handlebars';
import IParseMailTempalteDTO from "../dtos/IParseMailTempalteDTO";
import IMailTempalteProvider from "../models/IMailTemplateProvider";
import fs from 'fs';

export default class HandleBarsMailTemplateProvider implements IMailTempalteProvider {
    public async parse({ file, variables }: IParseMailTempalteDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        }); 
        
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}