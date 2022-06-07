import IMailTempalteProvider from "../models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTempalteProvider {
    public async parse(): Promise<string> {
        return 'Mail Content';
    }
}