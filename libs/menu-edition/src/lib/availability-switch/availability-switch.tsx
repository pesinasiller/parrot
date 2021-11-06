import { ChangeEvent, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFetch } from '../hooks/useFetch';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const GraySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: grey[800],
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: grey[200],
  },
  '& .MuiSwitch-track': {
    backgroundColor: grey[600],
  },
}));

const AvailabilitySwitch = ({
  availability,
  productId,
}: {
  availability: boolean;
  productId: string;
}) => {
  const { token } = useSelector((state: RootStateOrAny) => state);
  const [request, setRequest] = useState<{ url?: string; opts?: any }>();
  const [response, loading, hasError] = useFetch(request?.url, request?.opts);

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked ? 'AVAILABLE' : 'UNAVAILABLE';
    setRequest({
      url: `${process.env.NX_BASE_URL}/api/v1/products/${productId}/availability`,
      opts: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
          `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          availability: checked,
        }),
        data: {
          availability: checked
        }
      },
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <GraySwitch
            defaultChecked={availability}
            color="default"
            onChange={handleSwitchChange}
          />
        }
        label="Available"
        labelPlacement="top"
      />
    </FormGroup>
  );
};

export default AvailabilitySwitch;
