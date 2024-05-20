import BoxLayout from 'components/BoxLayout';
import Text from 'components/Text';
import { ButtonLink } from 'components/Button';
import Spacer from 'components/Spacer';

export default function NotFound() {
  return (
    <BoxLayout
      underElement={
        <ButtonLink
          to="/"
          size="xl"
          variant="white"
        >
          Back to Home
        </ButtonLink>
      }
    >
      <>
        <Text
          variant="section-title"
          centered
        >
          Not Found!
        </Text>
        <Spacer />
        <Text centered>
          Darn' it! The page is nowhere to be found.
        </Text>
      </>
    </BoxLayout>
  );
}
