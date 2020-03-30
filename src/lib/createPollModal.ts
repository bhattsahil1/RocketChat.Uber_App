import { IModify, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';

import { uuid } from './uuid';

export async function createPollModal({ id = '', question, persistence, data, modify, options = 2 }: {
    id?: string,
    question?: string,
    persistence: IPersistence,
    data,
    modify: IModify,
    options?: number,
}): Promise<IUIKitModalViewParam> {
    const viewId = id || uuid();

    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, viewId);
    await persistence.createWithAssociation({ room: data.room }, association);
    
    // await persistence.remove(viewId);

    const block = modify.getCreator().getBlockBuilder();
    block.addInputBlock({
        blockId: 'poll',
        element: block.newPlainTextInputElement({ initialValue:'Greetings! Simply book a ride by entering the details below. ?' , actionId: 'question' }),
        label: block.newPlainTextObject(' '),
    })
    // .addDividerBlock();

    // for (let i = 0; i < options; i++) {
    block.addInputBlock({
        blockId: 'poll',
        optional: true,
        element: block.newPlainTextInputElement({
            actionId: `option-1`,
            placeholder: block.newPlainTextObject('Enter your starting location'),
        }),
        label: block.newPlainTextObject('Starting point'),
    });

    block.addInputBlock({
        blockId: 'poll',
        optional: true,
        element: block.newPlainTextInputElement({
            actionId: `option-2`,
            placeholder: block.newPlainTextObject('Enter your destination'),
        }),
        label: block.newPlainTextObject('Destination'),
    });
    // }

    // block
    //     .addActionsBlock({
    //         blockId: 'config',
    //         elements: [
    //             block.newStaticSelectElement({
    //                 placeholder: block.newPlainTextObject('Multiple choices'),
    //                 actionId: 'mode',
    //                 initialValue: 'multiple',
    //                 options: [
    //                     {
    //                         text: block.newPlainTextObject('Multiple choices'),
    //                         value: 'multiple',
    //                     },
    //                     {
    //                         text: block.newPlainTextObject('Single choice'),
    //                         value: 'single',
    //                     },
    //                 ],
    //             }),
    //             block.newButtonElement({
    //                 actionId: 'addChoice',
    //                 text: block.newPlainTextObject('Add a choice'),
    //                 value: String(options + 1),
    //             }),

    //             block.newButtonElement({
    //                 actionId: 'removeChoice',
    //                 text: block.newPlainTextObject('Delete a choice'),
    //                 value: String(options - 1),
    //             }),

    //             block.newStaticSelectElement({
    //                 placeholder: block.newPlainTextObject('Open vote'),
    //                 actionId: 'visibility',
    //                 initialValue: 'open',
    //                 options: [
    //                     {
    //                         text: block.newPlainTextObject('Open vote'),
    //                         value: 'open',
    //                     },
    //                     {
    //                         text: block.newPlainTextObject('Confidential vote'),
    //                         value: 'confidential',
    //                     },
    //                 ],
    //             }),
    //         ],
    //     });

    return {
        id: viewId,
        title: block.newPlainTextObject('Uber- Book a Ride!'),
        submit: block.newButtonElement({
            text: block.newPlainTextObject('Request a ride'),
        }),
        close: block.newButtonElement({
            text: block.newPlainTextObject('Dismiss'),
        }),
        blocks: block.getBlocks(),
    };
}
