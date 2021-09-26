import React,{ useContext } from 'react';
import ios_out from './icon_safari_out.png'
import { Pane, Text } from 'evergreen-ui';
import { TRANSLATION } from '../../Translation';
import { ContextHandler } from '../../contexts/ContextHandler';

export default function Modal({Close}){
    const {language} = useContext(ContextHandler)

    return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={Close}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <Pane className=" items-center">
                                <Pane display="block" className="bg-white mb-3">
                                    <Pane paddingLeft={10}>
                                        <Text size={600} className="font-bold">{TRANSLATION[language].LOGIN.INSTRUCTION.TITLE}</Text>
                                    </Pane>
                                </Pane>
                                <hr className="divide-y"/>
                                <Pane display="block" className="bg-white my-3">
                                    <Pane paddingLeft={10}>
                                        <Text size={500} className="font-bold">Android</Text>
                                    </Pane>
                                    <Pane paddingLeft={25}>
                                        <Pane>
                                            <Text size={400} className="font-semibold">1. {TRANSLATION[language].LOGIN.INSTRUCTION.ANDROID.ITEM_1}</Text>
                                        </Pane>
                                        <Pane>
                                            <Text size={400} className="font-semibold">2. {TRANSLATION[language].LOGIN.INSTRUCTION.ANDROID.ITEM_2} <i className="fas fa-ellipsis-v text-red-700"></i></Text>
                                        </Pane>
                                        <Pane>
                                            <Text size={400} className="font-semibold">3. {TRANSLATION[language].LOGIN.INSTRUCTION.ANDROID.ITEM_3} <strong>Add to homescreen</strong></Text>
                                        </Pane>
                                    </Pane>
                                </Pane>
                                <hr className="divide-y"/>
                                <Pane display="block" className="items-center bg-white mt-3">
                                    <Pane paddingLeft={10}>
                                        <Text size={500} className="font-bold">IOS</Text>
                                    </Pane>
                                    <Pane paddingLeft={25}>
                                        <Pane>
                                            <Text size={400} className="font-semibold">1. {TRANSLATION[language].LOGIN.INSTRUCTION.IOS.ITEM_1}</Text>
                                        </Pane>
                                        <Pane>
                                            <Text size={400} className="font-semibold">2. {TRANSLATION[language].LOGIN.INSTRUCTION.IOS.ITEM_2} <img className="inline h-5" src={ios_out} alt=""/></Text>
                                        </Pane>
                                        <Pane>
                                            <Text size={400} className="font-semibold">3. {TRANSLATION[language].LOGIN.INSTRUCTION.IOS.ITEM_3} <strong>Add to homescreen</strong></Text>
                                        </Pane>
                                    </Pane>
                                </Pane>
                            </Pane>
                        </div>
                    </div>
                    <hr />
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={Close} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        {TRANSLATION[language].CONSTANT.CLOSE}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}