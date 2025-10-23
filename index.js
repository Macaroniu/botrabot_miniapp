import React, { useState, useEffect } from 'react';
import { Briefcase, User, FileText, Crown, Search, ChevronRight, Upload, Mail, Phone, Calendar } from 'lucide-react';

// Mock user data - заменить на данные из Telegram WebApp
const mockUser = {
    name: "Александр Петров",
    contact: "example@mail.com",
    plan: "Базовый",
    resumeCount: 2,
    tg_user_id: 123456789
};

const mockResumes = [
    { id: 1, name: "Резюме Frontend Developer", created_at: "2024-10-15" },
    { id: 2, name: "Резюме React Developer", created_at: "2024-10-10" }
];

const plans = {
    "Базовый": {
        name: "Базовый",
        price: "Бесплатно",
        features: ["До 5 откликов в день", "Базовый поиск", "1 резюме"],
        color: "from-blue-500 to-blue-600"
    },
    "Плюс": {
        name: "Плюс",
        price: "499₽/мес",
        features: ["До 20 откликов в день", "Расширенный поиск", "3 резюме", "Приоритет в показе"],
        color: "from-purple-500 to-purple-600"
    },
    "Про": {
        name: "Про",
        price: "999₽/мес",
        features: ["Безлимитные отклики", "AI-рекомендации", "Неограниченно резюме", "VIP поддержка"],
        color: "from-amber-500 to-amber-600"
    }
};

export default function JobSearchApp() {
    const [screen, setScreen] = useState('main');
    const [user, setUser] = useState(mockUser);
    const [resumes, setResumes] = useState(mockResumes);

    useEffect(() => {
        // Инициализация Telegram WebApp
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();

            // Установка цвета header
            tg.setHeaderColor('#1e293b');

            // Получение данных пользователя из initData
            const initData = tg.initDataUnsafe;
            if (initData.user) {
                // Здесь можно загрузить реальные данные пользователя
                console.log('Telegram User:', initData.user);
            }
        }
    }, []);

    const MainScreen = () => (
        <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Привет, {user.name.split(' ')[0]}! 👋</h2>
                        <p className="text-indigo-100 text-sm">Найдём работу мечты вместе</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <User className="w-8 h-8" />
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex-1">
                        <div className="text-xs text-indigo-100">Тариф</div>
                        <div className="font-semibold">{user.plan}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex-1">
                        <div className="text-xs text-indigo-100">Резюме</div>
                        <div className="font-semibold">{user.resumeCount}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <MenuCard
                    icon={<Search className="w-6 h-6" />}
                    title="Найти вакансии"
                    subtitle="Поиск работы"
                    gradient="from-emerald-500 to-teal-500"
                    onClick={() => setScreen('jobs')}
                />
                <MenuCard
                    icon={<FileText className="w-6 h-6" />}
                    title="Мои резюме"
                    subtitle={`${user.resumeCount} шт.`}
                    gradient="from-blue-500 to-cyan-500"
                    onClick={() => setScreen('resumes')}
                />
                <MenuCard
                    icon={<User className="w-6 h-6" />}
                    title="Профиль"
                    subtitle="Мои данные"
                    gradient="from-violet-500 to-purple-500"
                    onClick={() => setScreen('profile')}
                />
                <MenuCard
                    icon={<Crown className="w-6 h-6" />}
                    title="Подписка"
                    subtitle="Улучшить план"
                    gradient="from-amber-500 to-orange-500"
                    onClick={() => setScreen('subscription')}
                />
            </div>
        </div>
    );

    const ProfileScreen = () => (
        <div className="space-y-4">
            <ScreenHeader title="Профиль" onBack={() => setScreen('main')} />

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
                        <p className="text-slate-500 text-sm">ID: {user.tg_user_id}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <InfoRow icon={<Mail className="w-5 h-5" />} label="Контакт" value={user.contact} />
                    <InfoRow icon={<Crown className="w-5 h-5" />} label="Тарифный план" value={user.plan} />
                    <InfoRow icon={<FileText className="w-5 h-5" />} label="Резюме" value={`${user.resumeCount} шт.`} />
                </div>
            </div>

            <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-200 transition">
                Редактировать профиль
            </button>
        </div>
    );

    const ResumesScreen = () => (
        <div className="space-y-4">
            <ScreenHeader title="Мои резюме" onBack={() => setScreen('main')} />

            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Загрузить новое резюме
            </button>

            <div className="space-y-3">
                {resumes.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">У вас пока нет резюме</p>
                        <p className="text-slate-400 text-sm mt-2">Загрузите своё первое резюме</p>
                    </div>
                ) : (
                    resumes.map(resume => (
                        <div key={resume.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-indigo-300 transition cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-3 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-800 mb-1">{resume.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(resume.created_at).toLocaleDateString('ru-RU')}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const SubscriptionScreen = () => (
        <div className="space-y-4">
            <ScreenHeader title="Подписка" onBack={() => setScreen('main')} />

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 mb-1">
                    <Crown className="w-5 h-5" />
                    <span className="font-semibold">Текущий план: {user.plan}</span>
                </div>
                <p className="text-sm text-amber-700">Улучшите план для большего количества откликов</p>
            </div>

            <div className="space-y-3">
                {Object.values(plans).map(plan => (
                    <div
                        key={plan.name}
                        className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${
                            user.plan === plan.name ? 'border-indigo-500' : 'border-slate-200'
                        } hover:border-indigo-300 transition cursor-pointer`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
                                <p className="text-2xl font-bold text-indigo-600">{plan.price}</p>
                            </div>
                            {user.plan === plan.name && (
                                <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  Активен
                </span>
                            )}
                        </div>
                        <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="text-emerald-500 mt-0.5">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        {user.plan !== plan.name && (
                            <button className={`w-full bg-gradient-to-r ${plan.color} text-white py-2 rounded-lg font-medium hover:shadow-lg transition`}>
                                Выбрать план
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const JobsScreen = () => (
        <div className="space-y-4">
            <ScreenHeader title="Поиск вакансий" onBack={() => setScreen('main')} />

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 text-center border border-indigo-200">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Скоро появится</h3>
                <p className="text-slate-600">Функционал поиска вакансий находится в разработке</p>
                <div className="mt-6 flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto p-4 pb-8">
                {screen === 'main' && <MainScreen />}
                {screen === 'profile' && <ProfileScreen />}
                {screen === 'resumes' && <ResumesScreen />}
                {screen === 'subscription' && <SubscriptionScreen />}
                {screen === 'jobs' && <JobsScreen />}
            </div>
        </div>
    );
}

const MenuCard = ({ icon, title, subtitle, gradient, onClick }) => (
    <button
        onClick={onClick}
        className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 text-left`}
    >
        <div className="mb-3">{icon}</div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
    </button>
);

const ScreenHeader = ({ title, onBack }) => (
    <div className="flex items-center gap-3 mb-2">
        <button
            onClick={onBack}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition"
        >
            <ChevronRight className="w-5 h-5 rotate-180 text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
        <div className="text-slate-400">{icon}</div>
        <div className="flex-1">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="text-slate-800 font-medium">{value}</div>
        </div>
    </div>
);
