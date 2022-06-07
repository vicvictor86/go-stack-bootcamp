import { container } from "tsyringe";

import DiskStorageProvider from "./StorageProviders/implementations/DiskStorageProvider";
import IStorageProvider from "./StorageProviders/models/IStorageProvider";

import EtherealMailProvider from "./MailProviders/implementations/EtherealMailProvider";
import IMailProvider from "./MailProviders/models/IMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandleBarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProviders";

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandleBarsMailTemplateProvider);

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));