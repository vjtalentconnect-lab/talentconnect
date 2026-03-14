import { useNavigate } from 'react-router-dom';
import NotificationCenter from '../common/NotificationCenter';

const Header = ({ title, subtitle, showSearch = true, searchPlaceholder = "Search...", actions, userData }) => {
    const navigate = useNavigate();

    return (
        <header className="h-24 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-xl sticky top-0 z-[40] transition-all duration-500">
            <div className="flex flex-col">
                <h2 className="text-2xl font-black tracking-tighter dark:text-white uppercase leading-none italic">{title}</h2>
                {subtitle && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                    <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                    {subtitle}
                </p>}
            </div>

            <div className="flex items-center gap-4">
                {showSearch && (
                    <div className="relative group hidden lg:block">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all duration-300">
                            search
                        </span>
                        <input
                            className="w-96 bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-primary/10 text-slate-700 dark:text-slate-200 transition-all outline-none shadow-inner"
                            placeholder={searchPlaceholder}
                            type="text"
                        />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <NotificationCenter />
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
                    
                    {userData && (
                        <div className="flex items-center gap-4 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-[11px] font-black dark:text-white uppercase tracking-tighter leading-none italic">{userData.name}</p>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">{userData.roleTitle.split(' • ')[0]}</p>
                            </div>
                            <div className="size-11 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-lg group-hover:border-primary/50 transition-all duration-300" 
                                 style={{ backgroundImage: `url('${userData.avatar}')` }}>
                            </div>
                        </div>
                    )}

                    {actions && (
                        <div className="flex items-center gap-4">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
