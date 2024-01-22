const GlassCard = ({ children }) => {
  return (
    <div className="px-8 w-1/2 mx-auto rounded-md backdrop-filter backdrop-blur-sm bg-opacity-70 border border-slate-200 hover:border-slate-400 transition-all duration-200 hover:bg-opacity-20 hover:bg-white">
      {children}
    </div>
  );
};

export default GlassCard;
