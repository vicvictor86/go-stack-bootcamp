import IParseMailTemplateDTO from "../dtos/IParseMailTempalteDTO";

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}