const Footer = () => {
  return (
    <div className="bg-blue-800 px-10 md:px-40">
      <div className="container mx-auto py-2 flex flex-col items-center md:flex-row md:justify-between">
        <p className="font-semibold text-lg text-white">BookHotel.com</p>
        <div className="flex flex-row gap-4">
          <p className="font-semibold text-sm text-white">privacy policy</p>
          <p className="font-semibold text-sm text-white">terms & conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
