import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';


// ----------------------------------------------------------------------

export default function ShopProductCard() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://nftapi-production-405a.up.railway.app/nft');
        setProduct(response.data); // Assuming the API returns the product directly
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>; // Or any other loading state representation
  }








  return (
    <>
      {product.map(nft => (
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>

            <Box
              component="img"
              alt={nft.name}
              src={nft.image}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
              }}
            />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
              {nft.name}
            </Link>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {product.priceSale && fCurrency(product.priceSale)}
                </Typography>
                &nbsp;
                {(nft.price * 10000).toFixed(2)} ETH
              </Typography>
            </Stack>
          </Stack>
        </Card>
      ))}

    </>
  );
}

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };
