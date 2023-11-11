import { Helmet } from 'react-helmet-async';

import { Fund as Funds } from 'src/sections/fundWallet';

// ----------------------------------------------------------------------

export default function Fund() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <Funds />
    </>
  );
}
