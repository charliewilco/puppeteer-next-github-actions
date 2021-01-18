const Avatar: React.FC = ({ children }) => (
  <figure className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-tl from-pink-400 via-blue-500 to-purple-700 text-center rounded-full	flex flex-col justify-center overflow-hidden">
    <div className="">
      <span className="sm:text-2xl text-white font-bold">{children}</span>
    </div>
  </figure>
);

export default Avatar;
