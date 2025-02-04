import React, { FC, ReactElement } from 'react';

export const CombinedProvider = ({
  providers,
  children,
}: {
  providers: FC<{ children: ReactElement }>[];
  children: ReactElement;
}) => (
  <>
    {
      providers.reduceRight(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
      )
    }
  </>
);