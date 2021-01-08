import DeliveryGuySDK from 'DeliveryGuySDK';

const sdk = new DeliveryGuySDK({
	// baseUrl: process.env.NODE_ENV === 'production' ? 'https://deliveryguy.akondo.dev/api' : 'http://127.0.0.1:4000',
	baseUrl: process.env.NODE_ENV === 'production' ? 'https://deliveryguy.akondo.dev/api' : 'http://192.168.1.108:4000',
	token: 'web.delivery.guy'
});

export default sdk;
