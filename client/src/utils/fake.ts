type Customer = {
    id: number
    name: string;
    phone: string;
    email: string;
    address: string;
};


export const customers: Customer[] = [
    {
        id: 1,
        name: 'Snow Jon',
        phone: '791-675-8914',
        email: 'atuny0@sohu.com',
        address: '1745 T Street Southeast, Washington DC',
    },
    {
        id: 2,
        name: 'Lannister Cersei',
        phone: '813-117-7139',
        email: 'hbingley1@plala.or.jp',
        address: '6007 Applegate Lane, Louisville KY',
    },
    {
        id: 3,
        name: 'Lannister Jaime',
        phone: '739-292-7942',
        email: 'rshawe2@51.la',
        address: '560 Penstock Drive, Grass Valley CA',
    },
    {
        id: 4,
        name: 'Stark Arya',
        phone: '461-145-4186',
        email: 'yraigatt3@nature.com',
        address: '150 Carter Street, Manchester CT',
    },
    {
        id: 5,
        name: 'Targaryen Daenerys',
        phone: '285-771-1911',
        email: 'kmeus4@upenn.edu',
        address: '2721 Lindsay Avenue, Louisville KY',
    },
    {
        id: 6,
        name: 'Melisandre Quigley',
        phone: '912-100-5118',
        email: 'bleveragei@so-net.ne.jp',
        address: '5403 Illinois Avenue, Nashville TN',
    },
    {
        id: 7,
        name: 'Clifford Ferrara',
        phone: '581-108-7855',
        email: 'beykelhofm@wikispaces.com',
        address: '81 Seaton Place Northwest, Washington DC',
    },
    {
        id: 8,
        name: 'Frances Rossini',
        phone: '533-708-0340',
        email: 'lgronaverp@cornell.edu',
        address: '5601 West Crocus Drive, Glendale AZ',
    },
    {
        id: 9,
        name: 'Roxie Harvey',
        phone: '886-766-8617',
        email: 'jissetts@hostgator.com',
        address: '629 Debbie Drive, Nashville TN',
    },
    {
        id: 10,
        name: 'Gust Purdy',
        phone: '886-889-0258"',
        email: 'sberminghamh@chron.com',
        address: '5461 West Shades Valley Drive, Montgomery AL',
    },
];


    // console.log(errors);

    // const [customerError, setCustomerError] = useState('');

    // const formSubmit = async (values: createCustomerInput) => {
    //     try {
    //         await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/customers`, values, {
    //             withCredentials: true,
    //         });
    //         console.log('Customer Created');
    //     } catch (e: any) {
    //         console.log(errors);
    //         setCustomerError(e.message);
    //         alert(customerError);
    //     }
    // };

