interface IProps {
  className?: string;
}

function Background({ className }: IProps) {
  return (
    <div className={`h-screen w-screen bg-zinc-800 fixed -z-50 ${className}`}>
      <div
        className={`h-full w-full bg-cover bg-bottom fixed blur-md`}
        style={{ backgroundImage: "url('/denny-muller-Qxb2Fh6Aqpg-unsplash.jpg')" }}
      />
    </div>
  );
}

export default Background;
