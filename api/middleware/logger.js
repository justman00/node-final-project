module.exports = (type) => {
  return (req, res, next) => {
    const date = new Date().toISOString();

    switch (type) {
      case "small":
        console.info(
          `Date - ${date}, Method - ${req.method}, URL - ${req.path} `,
        );
        break;
      case "combined":
        const userAgent = req.headers["user-agent"];
        console.info(
          `Date - ${date}, Method - ${req.method}, URL - ${req.path}, User Agent - ${userAgent}, IP address - ${req.ip}`,
        );
        break;
    }
    next();
  };
};
