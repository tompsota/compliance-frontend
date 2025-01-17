const { resolve } = require('path');

const compileRoutConfig = (pathPrefix, appString) => {
  const [address, protocol] = appString.split('/');
  const [app, port] = address.split(':');
  const host =
    process.env[`LOCAL_${app.toUpperCase()}_HOST`] || process.env.DEFAULT_HOST;
  return [
    `${pathPrefix}/${app}`,
    { host: `${protocol || 'http'}://${host}:${port}` },
  ];
};

const localRoutesFor = (pathPrefix, appsString) =>
  appsString.split(',').reduce((accRoutes, appString) => {
    const [route, config] = compileRoutConfig(pathPrefix, appString);
    accRoutes[route] = config;
    return accRoutes;
  }, {});

const includeFedMods = (plugins, fedMods) => ({
  plugins: [
    ...plugins,
    // Expose federated modules for other applications
    require('@redhat-cloud-services/frontend-components-config/federated-modules')(
      {
        root: resolve(__dirname, '../'),
        exposes: fedMods,
      }
    ),
  ],
});

module.exports = {
  localRoutesFor,
  includeFedMods,
};
