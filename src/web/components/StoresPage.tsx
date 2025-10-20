import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';

interface StoreCardProps {
  name: string;
  logo: string;
  bgColor: string;
  cashback?: string;
  category: string;
  storeUrl: string;
  onShowStoreDetail?:(store: any) => void;
}

function StoreCard({ name, logo, bgColor, cashback, category, storeUrl,onShowStoreDetail }: StoreCardProps) {
  const handleStoreClick = () => {
    if (storeUrl === '#') return; // Don't navigate if no URL
    
    // Add DO Shopping tracking parameters
    const trackingParams = new URLSearchParams({
      utm_source: 'doshopping',
      utm_medium: 'mobile_app',
      utm_campaign: 'partner_store',
      utm_content: name.toLowerCase().replace(/\s+/g, '_'),
      do_user_id: 'user_13614', // This would come from user context
      do_store: name.toLowerCase().replace(/\s+/g, '_'),
      do_timestamp: Date.now().toString()
    });
    
    const trackedUrl = `${storeUrl}?${trackingParams.toString()}`;
    const storedata = {name: name,url:trackedUrl,domain:storeUrl};
    onShowStoreDetail(storedata)
    //window.open(trackedUrl, '_blank');
  };

  return (
    <button 
      onClick={handleStoreClick}
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 w-full text-left ${
        storeUrl === '#' ? 'cursor-default' : 'cursor-pointer'
      }`}
      disabled={storeUrl === '#'}
    >
      <div className="flex items-center mb-3">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mr-3`}>
          {typeof logo === 'string' ? (
            <span className="text-white font-bold text-sm">{logo}</span>
          ) : (
            logo
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
      </div>
      {cashback && (
        <div className="bg-yellow-100 px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-800">{cashback}</span>
        </div>
      )}
    </button>
  );
}

interface StoreCategoryProps {
  title: string;
  stores: StoreCardProps[];
  onShowStoreDetail?:(store: any) => void;
}

function StoreCategory({ title, stores,onShowStoreDetail }: StoreCategoryProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {stores.map((store, index) => (
          <StoreCard key={index} {...store} onShowStoreDetail={onShowStoreDetail} />
        ))}
      </div>
    </section>
  );
}
interface StoresPageProps {
  currentUser?: any;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
  onShowStoreDetail?:(store: any) => void;
}
export default function StoresPage({ currentUser,onAccountClick,onShowUpgradeAccount,onShowStoreDetail }: StoresPageProps) {
  const { t } = useLanguage();

  // Saudi Arabian partners data
  const partnersData = [
    {
      "name": "Al Baik",
      "description": "Saudi Arabia's most beloved fast-food chain, famous for its crispy fried chicken and garlic sauce",
      "logo": "AB",
      "webLink": "https://albaik.com",
      "tags": [{"id": 7, "name": "Food"}],
      "stores": [
        {"name": "Riyadh - King Fahd Road", "address": "King Fahd Road, Riyadh", "phone": "+966 11 234 5678"},
        {"name": "Jeddah - Tahlia Street", "address": "Tahlia Street, Jeddah", "phone": "+966 12 234 5678"}
      ]
    },
    {
      "name": "Jarir Bookstore",
      "description": "Leading electronics, office supplies, and book retailer in Saudi Arabia",
      "logo": "JR",
      "webLink": "https://jarir.com",
      "tags": [{"id": 13, "name": "HighTech"}, {"id": 5, "name": "Education"}],
      "stores": [
        {"name": "Riyadh - Olaya", "address": "Olaya Street, Riyadh", "phone": "+966 11 828 8888"},
        {"name": "Jeddah - Red Sea Mall", "address": "Red Sea Mall, Jeddah", "phone": "+966 12 606 9999"}
      ]
    },
    {
      "name": "Centrepoint",
      "description": "Popular department store offering fashion, home, and lifestyle products",
      "logo": "CP",
      "webLink": "https://centrepoint.com",
      "tags": [{"id": 6, "name": "Mode"}, {"id": 1, "name": "Maison"}],
      "stores": [
        {"name": "Riyadh - Riyadh Park", "address": "Riyadh Park Mall, Riyadh", "phone": "+966 11 454 4444"},
        {"name": "Jeddah - Mall of Arabia", "address": "Mall of Arabia, Jeddah", "phone": "+966 12 606 6000"}
      ]
    },
    {
      "name": "Ben Yaghlane",
      "logo": "https://server.taoo.ai/api/uploads/8c1687f4-ca82-4215-be01-629ee10bc885",
      "webLink": "http://www.benyaghlanepro.com/FR/",
      "tags": [{"id": 17, "name": "Café"}, {"id": 7, "name": "Food"}],
      "stores": [
        {"name": "BY Ennasr", "address": "2 Av. Hédi Nouira, Ariana 2037", "phone": "+216 29 61 41 36"},
        {"name": "BY Rue Mustpha Mbarek, Tunis", "address": "10, Rue Mustapha MBAREK,1000 TUNIS", "phone": "+216 79 30 74 23 "}
      ]
    },
    {
      "name": "Kiabi",
      "logo": "https://server.taoo.ai/api/uploads/b0816db2-1ee8-4aee-aec8-bd1d35d271b1",
      "webLink": "https://kiabi.tn",
      "tags": [{"id": 6, "name": "Mode"}],
      "stores": [
        {"name": "KIABI - AZUR CITY", "address": "Centre commercial Azur City Autoroute A1 - Km 2 2097 - Ben Arous", "phone": "+216 36 407 028"},
        {"name": "KIABI - MANAR CITY", "address": "Centre commercial Manar City 14 Av. du Roi Abdelaziz Ibn Saoud 2092 - Tunis", "phone": "+216 36 407 017"}
      ]
    },
    {
      "name": "KFC",
      "logo": "https://server.taoo.ai/api/uploads/08140cc2-b7b3-4628-af28-4654e0679dd6",
      "webLink": "https://kfc.com.tn",
      "tags": [{"id": 7, "name": "Food"}],
      "stores": [
        {"name": "KFC LA MARSA", "address": "Avenue habib bourguiba, la marsa plage Marsa", "phone": "+216 29 77 63 34"},
        {"name": "KFC MANAR CITY", "address": "Manar city", "phone": "+216 29 77 83 00"}
      ]
    },
    {
      "name": "Z'Animax Animalerie",
      "logo": "https://server.taoo.ai/api/uploads/a8483beb-d04c-4173-8613-2c2588bb4be9",
      "webLink": "https://www.zanimax.tn",
      "tags": [{"id": 10, "name": "Animaux"}],
      "stores": [
        {"name": "Z'Animax  - El Aouina", "address": "Résidence Ilye, Avenue Dar Fadhel El Aouina, Soukra", "phone": ""},
        {"name": "Z'Animax - Menzeh 6", "address": "Avenue Othman Ibn Affane, Menzah 6, Ariana", "phone": ""}
      ]
    },
    {
      "name": "La Reine",
      "logo": "https://server.taoo.ai/api/uploads/2878ede2-18e3-48fa-9fe4-f7df4ace6059",
      "webLink": "https://lareine.com.tn/",
      "tags": [{"id": 12, "name": "Santé"}, {"id": 6, "name": "Mode"}, {"id": 2, "name": "Beauté"}],
      "stores": [
        {"name": "Parfumerie La Reine - Sfax 1", "address": "67 rue Habib maazoun 3000 Sfax", "phone": "+216 29 316 162"},
        {"name": "Parfumerie La Reine  - Sfax 2", "address": "27 rue Patrice lumumba 3000 Sfax", "phone": "+216 25 316 170"}
      ]
    },
    {
      "name": "Edito",
      "logo": "https://server.taoo.ai/api/uploads/07d17edd-92f1-448d-ba42-4e4d0e48e319",
      "webLink": null,
      "tags": [{"id": 5, "name": "Education"}],
      "stores": [
        {"name": "El Ghazala", "address": "Omrane 2, Cité La Gazelle, V5HJ+H56, Ariana", "phone": "+216 29 631 215"},
        {"name": "Ennasr", "address": "12 Rue Abdallah Zouaghi, Ennasr 2", "phone": "+216 29 631 310"}
      ]
    },
    {
      "name": "Moons",
      "logo": "https://server.taoo.ai/api/uploads/2359e625-1596-4e22-8644-fecef9bda0bd",
      "webLink": "https://moons.tn/",
      "tags": [{"id": 9, "name": "Mariage"}],
      "stores": [{"name": "Moons", "address": " 05, Rue Ahmad Ibn Arafa, La Marsa, Tunis, Tunisia", "phone": "+216 55 015 624"}]
    },
    {
      "name": "Mikui",
      "logo": "https://server.taoo.ai/api/uploads/8af4ada7-b51f-4fcb-914b-da3276ccbc69",
      "webLink": null,
      "tags": [{"id": 7, "name": "Food"}],
      "stores": [
        {"name": "Mikui - L'Aouina", "address": "Mikui L'Aouina, Avenue Khaled Ibn El Walid, L'Aouina", "phone": "+216 54 545 229"},
        {"name": "Mikui - Ennasr", "address": "Ennasr 2 ,résidence \"samar\", Tunis, Tunisia", "phone": "+216 54 545 229"}
      ]
    },
    {
      "name": "YOUR ZONE ACADEMY",
      "logo": "https://server.taoo.ai/api/uploads/1058c043-51bb-43fe-9940-10dc17e3b1f6",
      "webLink": "https://yzacademy.com/",
      "tags": [{"id": 8, "name": "Enfants"}, {"id": 5, "name": "Education"}],
      "stores": [{"name": "Lac 1", "address": "1, Villa Jasmin, 1053 Rue du Lac Tibériade, Tunis", "phone": "+216 58 202 354"}]
    },
    {
      "name": "Houdou Yoga Space",
      "logo": "https://server.taoo.ai/api/uploads/a0e6b272-4bb3-46cf-a186-e2a4d6f3e190",
      "webLink": "https://houdou.tn/",
      "tags": [{"id": 12, "name": "Santé"}, {"id": 4, "name": "Activité & Loisir"}, {"id": 3, "name": "Sport"}],
      "stores": [{"name": "La Soukra", "address": "Houdou Yoga Space, 77 bis avenue Fattouma Bourguiba, La Soukra, Tunisia", "phone": "+216  23 570 751"}]
    },
    {
      "name": "Ecovillage Natural Beauty",
      "logo": "https://server.taoo.ai/api/uploads/15407a28-f4b0-4be1-9276-22b5082cbf1c",
      "webLink": "https://ecovillage.com.tn/",
      "tags": [{"id": 2, "name": "Beauté"}, {"id": 1, "name": "Maison"}],
      "stores": [
        {"name": "Ecovillage - Manar City", "address": "Manar city, avenue abdelaziz saoud El Manar 3, 37 Rue Ali Zlitni, Tunis", "phone": "+216 56 835 967"},
        {"name": "Ecovillage - Azur City", "address": "Centre Commercial Azur City, Ben Arous", "phone": "+216 56 829 731"}
      ]
    },
    {
      "name": "Desa Optic",
      "logo": "https://server.taoo.ai/api/uploads/9e593430-e396-424e-849e-3ef40bdccd4f",
      "webLink": null,
      "tags": [{"id": 12, "name": "Santé"}, {"id": 6, "name": "Mode"}, {"id": 2, "name": "Beauté"}],
      "stores": [{"name": "Riadh Andalous", "address": "Rue Ibn Khaldoun, Résidence Floralys, Riadh Andalous", "phone": "+216 27 275 254"}]
    },
    {
      "name": "SkyMil Informatique",
      "logo": "https://server.taoo.ai/api/uploads/23c2b34d-3d07-4d69-bdac-fb60e9ea037a",
      "webLink": "https://skymil-informatique.com/",
      "tags": [{"id": 13, "name": "HighTech"}],
      "stores": [{"name": "Mannouba", "address": "15 rue el akkad 2010 La Manouba, Tunisie", "phone": "55 93 95 87"}]
    },
    {
      "name": "Flamingo Forest Parcours Aventure",
      "logo": "https://server.taoo.ai/api/uploads/bc080314-69ec-44b9-a183-f52db35fc017",
      "webLink": null,
      "tags": [{"id": 4, "name": "Activité & Loisir"}],
      "stores": [{"name": "Forêt Ibn Sinaa", "address": "Forêt Ibn Sinaa El, 2066, Tunis", "phone": "+216 20 321 477"}]
    },
    {
      "name": "Khansa Yazidi",
      "logo": "https://server.taoo.ai/api/uploads/047b2be5-007b-4dd6-b7c8-f0e0afd1e263",
      "webLink": "https://www.khansayazidi.com/",
      "tags": [{"id": 14, "name": "Construction"}, {"id": 1, "name": "Maison"}],
      "stores": [{"name": "Ezzahra", "address": "87 avenue Habib Bourguiba, Ezzahra, Tunisia, 2034", "phone": "+216 52 428 501"}]
    },
    {
      "name": "WeFix",
      "logo": "https://server.taoo.ai/api/uploads/a30d5f3f-4279-4a03-af90-032f0f86a6fa",
      "webLink": "https://wefix.tn/",
      "tags": [{"id": 1, "name": "Maison"}],
      "stores": [{"name": "WeFix", "address": "104 Rue Jaber Ibn Hayen، Marsa 2070", "phone": "+216 23 296 086"}]
    },
    {
      "name": "Point de vue - Menzah 6",
      "logo": "https://server.taoo.ai/api/uploads/86571cb9-7fe8-4e91-9c2d-b91de280822c",
      "webLink": null,
      "tags": [{"id": 12, "name": "Santé"}, {"id": 6, "name": "Mode"}],
      "stores": [{"name": "Menzah 6", "address": "V52C+87J, Av. Othman Ibn Affane, Ariana", "phone": "+216 71 234 679"}]
    },
    {
      "name": "Brico-direct.tn",
      "logo": "https://server.taoo.ai/api/uploads/eada5c4f-e306-4235-87c5-c534edafd8c1",
      "webLink": "https://brico-direct.tn/",
      "tags": [{"id": 11, "name": "Automobile"}, {"id": 14, "name": "Construction"}, {"id": 1, "name": "Maison"}],
      "stores": [{"name": "Brico-direct", "address": " 71bis Ave Louis Braille, Tunis, Tunisia", "phone": "+216 71 100 950"}]
    },
    {
      "name": "Moline",
      "logo": "https://server.taoo.ai/api/uploads/fdc0b0f8-13ad-4257-9e85-0594f0eb3c3d",
      "webLink": "https://moline.com.tn/",
      "tags": [{"id": 8, "name": "Enfants"}, {"id": 2, "name": "Beauté"}],
      "stores": [{"name": "Moline - Le Bardo", "address": "11 Ave Bayram Ettounsi, Le Bardo, Tunis", "phone": "+216 50 899 925"}]
    },
    {
      "name": "Slim Fit",
      "logo": "https://server.taoo.ai/api/uploads/51ad370c-51b7-46fc-82c2-75a90455fad9",
      "webLink": null,
      "tags": [{"id": 3, "name": "Sport"}],
      "stores": [{"name": "Slim Fit - Les berges du lac II", "address": "Immeuble L'Atrium Rue Iles Des Rohds Les Jardin Du Lac, Tunis, Tunisia", "phone": "+216 23 230 802"}]
    },
    {
      "name": "Arena Gym Premium",
      "logo": "https://server.taoo.ai/api/uploads/69991b89-5a3a-4cf0-968c-177839a84358",
      "webLink": "",
      "tags": [{"id": 3, "name": "Sport"}],
      "stores": [{"name": "Arena gym Premium - La Soukra ", "address": "Arena Gym Premium, Rue du parc 2036 La Soukra, Tunisie, La Soukra, Tunisia", "phone": "+216 28 810 818"}]
    },
    {
      "name": "Yallaa",
      "logo": "https://server.taoo.ai/api/uploads/151f42d4-d980-43f4-934e-99486e98060c",
      "webLink": "https://www.yallaa.tn",
      "tags": [{"id": 8, "name": "Enfants"}, {"id": 4, "name": "Activité & Loisir"}],
      "stores": [{"name": "Yalla - Ennasr", "address": "24 Rue Chedly Bouhahya, Ennasr 2, Ariana", "phone": "+216 51 005 005"}]
    },
    {
      "name": "Arena Padel",
      "logo": "https://server.taoo.ai/api/uploads/725ed9b4-6435-46b5-b736-0d78f25bd3a3",
      "webLink": "https://arenapadel.tn/",
      "tags": [{"id": 3, "name": "Sport"}],
      "stores": [{"name": "Arena padel Premium - La Soukra", "address": "Arena Gym Premium, Rue du parc 2036 La Soukra, Tunisie, La Soukra, Tunisia", "phone": "+216  28 588 084"}]
    },
    {
      "name": "Avocado Bar",
      "logo": "https://server.taoo.ai/api/uploads/a4e825ff-b157-414a-9f75-27aabfc4184f",
      "webLink": "",
      "tags": [{"id": 12, "name": "Santé"}, {"id": 7, "name": "Food"}],
      "stores": [{"name": "Avocado - Les berges du lac II", "address": "Avocado bar lac 2, Rue De L'Ile De Java، Tunis", "phone": "+216  23 230 802"}]
    },
    {
      "name": "Les Cavaliers de Gammarth",
      "logo": "https://server.taoo.ai/api/uploads/a17f165d-9e32-4602-bbc2-828ce13adffa",
      "webLink": "",
      "tags": [{"id": 4, "name": "Activité & Loisir"}, {"id": 10, "name": "Animaux"}],
      "stores": [{"name": "Gammarth", "address": "28/56, Rue Abdelkrim Khattabi Gammarth, Tunisie", "phone": "+216 23 888 258"}]
    },
    {
      "name": "Iberis",
      "logo": "https://server.taoo.ai/api/uploads/02d61b0b-c5a7-4b37-8d58-09f26414b828",
      "webLink": "https://finances.iberis.io/",
      "tags": [{"id": 13, "name": "HighTech"}],
      "stores": [{"name": "Lac 1", "address": "The Dot, 2 Rue du Lac Malaren, les Berges du Lac 1, Tunis, Tunisia, 1053", "phone": "216 98 156 666"}]
    },
    {
      "name": "The Hills Fast",
      "logo": "https://server.taoo.ai/api/uploads/21cadbbe-f97c-4296-8b82-807752691508",
      "webLink": "",
      "tags": [{"id": 17, "name": "Café"}, {"id": 7, "name": "Food"}],
      "stores": [{"name": "Jardin de Carthage", "address": "Résidence Elyess , jardin de carthage . Tunis", "phone": "+216 29 506 606"}]
    },
    {
      "name": "Shwoppy",
      "logo": "https://server.taoo.ai/api/uploads/f953c036-0667-4e1a-b1e6-9f371692717c",
      "webLink": "https://shwoppy.com/",
      "tags": [{"id": 18, "name": "Vetêments"}],
      "stores": [{"name": "Al Aouina", "address": "Rue l'environnement, Tunis 2036", "phone": "+216 51 117 317"}]
    },
    {
      "name": "IKEA Saudi Arabia",
      "description": "Swedish furniture and home accessories retailer",
      "logo": "IK",
      "webLink": "https://www.ikea.com/sa",
      "tags": [{"id": 1, "name": "Maison"}],
      "stores": [
        {"name": "Riyadh", "address": "Exit 5, Khurais Road, Riyadh", "phone": "+966 920 010 203"},
        {"name": "Jeddah", "address": "Haifa Street, Jeddah", "phone": "+966 920 010 203"}
      ]
    },
    {
      "name": "Panda",
      "description": "Major supermarket chain in Saudi Arabia",
      "logo": "PD",
      "webLink": "https://panda.com.sa",
      "tags": [{"id": 7, "name": "Food"}],
      "stores": [
        {"name": "Riyadh - Takhassusi", "address": "Takhassusi Street, Riyadh", "phone": "+966 920 000 800"},
        {"name": "Jeddah - Palestine Street", "address": "Palestine Street, Jeddah", "phone": "+966 920 000 800"}
      ]
    },
    {
      "name": "Sephora Saudi Arabia",
      "description": "Leading beauty and cosmetics retailer",
      "logo": "SP",
      "webLink": "https://www.sephora.sa",
      "tags": [{"id": 2, "name": "Beauté"}],
      "stores": [
        {"name": "Riyadh - Kingdom Centre", "address": "Kingdom Centre Mall, Riyadh", "phone": "+966 11 211 7777"},
        {"name": "Jeddah - Red Sea Mall", "address": "Red Sea Mall, Jeddah", "phone": "+966 12 606 7777"}
      ]
    }
  ];

  // Helper function to get logo display
  const getLogoDisplay = (partner: any) => {
    if (partner.logo && partner.logo.startsWith('http')) {
      return <img src={partner.logo} alt={partner.name} className="w-8 h-8 rounded object-cover" />;
    }
    return <span className="text-white font-bold text-sm">{partner.name.substring(0, 2).toUpperCase()}</span>;
  };

  // Helper function to get random background color
  const getRandomBgColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-600'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Categorize partners by their tags
  const fashionStores = partnersData.filter(partner => 
    partner.tags?.some(tag => ['Mode', 'Vetêments', 'Beauté'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 5%`,
    category: partner.tags?.[0]?.name || 'Mode',
    storeUrl: partner.webLink || '#'
  }));

  const techStores = partnersData.filter(partner => 
    partner.tags?.some(tag => ['HighTech', 'Construction'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 4%`,
    category: partner.tags?.[0]?.name || 'Technologie',
    storeUrl: partner.webLink || '#'
  }));

  const foodStores = partnersData.filter(partner =>
    partner.tags?.some(tag => ['Food', 'Café'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 6%`,
    category: partner.tags?.[0]?.name || 'Food',
    storeUrl: partner.webLink || '#'
  }));

  const sportStores = partnersData.filter(partner =>
    partner.tags?.some(tag => ['Sport', 'Activité & Loisir'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 5%`,
    category: partner.tags?.[0]?.name || 'Sport',
    storeUrl: partner.webLink || '#'
  }));

  const homeStores = partnersData.filter(partner =>
    partner.tags?.some(tag => ['Maison', 'Décoration', 'Jardinage'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 7.5%`,
    category: partner.tags?.[0]?.name || 'Maison',
    storeUrl: partner.webLink || '#'
  }));

  const healthStores = partnersData.filter(partner =>
    partner.tags?.some(tag => ['Santé', 'Enfants', 'Animaux'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 5%`,
    category: partner.tags?.[0]?.name || 'Santé',
    storeUrl: partner.webLink || '#'
  }));

  const educationStores = partnersData.filter(partner =>
    partner.tags?.some(tag => ['Education', 'Mariage'].includes(tag.name))
  ).map(partner => ({
    name: partner.name,
    logo: getLogoDisplay(partner),
    bgColor: getRandomBgColor(),
    cashback: `${t('stores.upTo')} 4%`,
    category: partner.tags?.[0]?.name || 'Education',
    storeUrl: partner.webLink || '#'
  }));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header points={currentUser.points} onAccountClick={onAccountClick} onPointsClick={onShowUpgradeAccount} />
      
      <div className="px-4 py-6 space-y-6">
        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-900 mb-1">{t('stores.discoverPartners')}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-800">{t('stores.over500Stores')}</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={t('stores.searchStore')}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <StoreCategory title={t('stores.fashionAccessories')} stores={fashionStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.restaurants')} stores={foodStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.techConstruction')} stores={techStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.sport')} stores={sportStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.home')} stores={homeStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.health')} stores={healthStores} onShowStoreDetail={onShowStoreDetail} />
        <StoreCategory title={t('stores.education')} stores={educationStores} onShowStoreDetail={onShowStoreDetail} />

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mt-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{partnersData.length}+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Magasins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">15%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Cashback max</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">24/7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}