
import { FormattedMessage } from 'react-intl';
import { KyberNetwork, Messages2, Calendar1, Kanban, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';


// console.log("serviceToken", localStorage.getItem('serviceToken'))
// console.log("selectedUSer", localStorage.getItem('selectedUSer'))
// console.log("reload", localStorage.getItem('reload'))
const selectedUSer = localStorage.getItem('selectedUSer')
const usuarioParseado = JSON.parse(selectedUSer);
const usuario = usuarioParseado?.useremail;
//console.log("usuario", usuario)

let antioquia = usuario === 'encuesta.antioquia@commerk.com.co';
let valle = usuario === 'encuesta.valle@commerk.com.co';
let todos = usuario === 'encuesta@commerk.com.co';

// console.log("antioquia", antioquia)
// console.log("valle", valle)
// console.log("todos", todos)







const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// console.log("icons", icons.applications.render.displayName)

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="EncuestasSatisfacion" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'customer',
      title: <FormattedMessage id="ENCUESTAS" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        todos && {
          id: 'customer-list',
          title: <FormattedMessage id="Todas" />,
          type: 'item',
          url: '/apps/customer/customer-list'
        },
        antioquia && {
          id: 'customer-list-antioquia',
          title: <FormattedMessage id="Antioquia" />,
          type: 'item',
          url: '/apps/customer/customer-list-antioquia',
        },
        valle && {
          id: 'customer-list-valle',
          title: <FormattedMessage id="Valle" />,
          type: 'item',
          url: '/apps/customer/customer-list-valle'
        },
        todos && {
          id: 'customer-list-antioquia',
          title: <FormattedMessage id="Antioquia" />,
          type: 'item',
          url: '/apps/customer/customer-list-antioquia',
        },
        todos && {
          id: 'customer-list-valle',
          title: <FormattedMessage id="Valle" />,
          type: 'item',
          url: '/apps/customer/customer-list-valle'
        },
        todos && {
          id: 'customer-list-result',
          title: <FormattedMessage id="Resultados" />,
          type: 'item',
          url: '/apps/customer/customer-list-result'
        },
        antioquia && {
          id: 'customer-list-result',
          title: <FormattedMessage id="Resultados" />,
          type: 'item',
          url: '/apps/customer/customer-list-result'
        },
        valle && {
          id: 'customer-list-result',
          title: <FormattedMessage id="Resultados" />,
          type: 'item',
          url: '/apps/customer/customer-list-result'
        },
        antioquia && {
          id: 'customer-customer-email',
          title: <FormattedMessage id="Email por enviar" />,
          type: 'item',
          url: '/apps/customer/customer-email'
        },
        antioquia && {
          id: 'customer-send-email',
          title: <FormattedMessage id="Email enviados" />,
          type: 'item',
          url: '/apps/customer/customer-send-email'
        },
        valle && {
          id: 'customer-list-result',
          title: <FormattedMessage id="Email" />,
          type: 'item',
          url: '/apps/customer/customer-email'
        }
      ]
    }

  ]
};

export default applications;


