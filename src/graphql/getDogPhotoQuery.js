import gql from 'graphql-tag';

export const getDogPhotoQuery = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;
