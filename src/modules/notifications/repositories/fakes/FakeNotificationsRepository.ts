import { ObjectId } from 'mongodb';

import INotificationtDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import ICreateNotificationDTO from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../../infra/typeorm/schemas/Notification';

export default class NotificationsRepository implements ICreateNotificationDTO {
    private notifications: Notification[] = [];

    public async create({ content, recipient_id }: INotificationtDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, { id: new ObjectId(), content, recipient_id });

        this.notifications.push(notification);

        return notification;
    }
}