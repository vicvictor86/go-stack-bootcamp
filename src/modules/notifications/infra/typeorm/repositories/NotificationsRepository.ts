import { connectionSourceMongo } from '@shared/infra/typeorm/index';

import INotificationtDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import ICreateNotificationDTO from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../schemas/Notification';

const notificationRepository = connectionSourceMongo.getMongoRepository(Notification);

export const NotificationsRepository: ICreateNotificationDTO = notificationRepository.extend({
    async create({ content, recipient_id }: INotificationtDTO): Promise<Notification> {
        console.log(notificationRepository);
        const notification = notificationRepository.create({ content, recipient_id  });

        await notificationRepository.save(notification);

        return notification;
    },
})