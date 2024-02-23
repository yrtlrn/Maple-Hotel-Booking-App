const HotelDetailsSection = () => {
    return (
        <section className="flex flex-col gap-5">
            <div className="mt-5">
                <label className="flex flex-col">
                    Name
                    <input
                        type="text"
                        className="input input-bordered w-full mt-2"
                        autoFocus
                    />
                </label>
            </div>
            <div className="flex md:flex-row w-full gap-3">
                <label className="flex flex-col md:w-1/2 w-full ">
                    City
                    <input
                        type="text"
                        className="input input-bordered w-full mt-2"
                        autoFocus
                    />
                </label>
                <label className="flex flex-col w-full md:w-1/2">
                    Country
                    <input
                        type="text"
                        className="input input-bordered w-full mt-2"
                        autoFocus
                    />
                </label>
            </div>
        </section>
    );
};
export default HotelDetailsSection;
