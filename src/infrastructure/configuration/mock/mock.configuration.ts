import { IConfigurationModel } from '../configuration.model';

export const mockConfiguration: IConfigurationModel = {
    environment: 'test',
    logging: {
        critical: {
            messageStyle: {
                backgroundColor: 'red',
                textColor: 'white'
            },
            prefixStyle: {
                backgroundColor: 'red',
                textColor: 'white'
            }
        },
        debug: {
            messageStyle: {
                backgroundColor: 'white',
                textColor: 'cyan'
            },
            prefixStyle: {
                backgroundColor: 'cyan',
                textColor: 'white'
            }
        },
        error: {
            messageStyle: {
                backgroundColor: 'white',
                textColor: 'red'
            },
            prefixStyle: {
                backgroundColor: 'red',
                textColor: 'white'
            }
        },
        success: {
            messageStyle: {
                backgroundColor: 'white',
                textColor: 'green'
            },
            prefixStyle: {
                backgroundColor: 'green',
                textColor: 'white'
            }
        },
        verbose: {
            messageStyle: {
                backgroundColor: 'white',
                textColor: 'blue'
            },
            prefixStyle: {
                backgroundColor: 'blue',
                textColor: 'white'
            }
        },
        warning: {
            messageStyle: {
                backgroundColor: 'white',
                textColor: 'yellow'
            },
            prefixStyle: {
                backgroundColor: 'yellow',
                textColor: 'white'
            }
        }
    },
    serviceWorkerPath: 'test'
};
