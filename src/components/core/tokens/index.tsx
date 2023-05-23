import { useStaticData } from '../../../provider/StaticDataStoreProvider';
import { networkType } from '../../../store/StaticDataStore';
import React from 'react';

type TokensProps = {
  tokens: {
    isNative: boolean;
    symbol: string;
    rootAddress: string;
    network?: string;
    networkType?: networkType;
  }[];
};

const Tokens = ({ tokens }: TokensProps) => {
  const staticData = useStaticData();

  return (
    <div className='flex flex-wrap items-center gap-x-2'>
      <div className='flex items-center'>
        {tokens.map((token, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className='w-7 h-7 bg-cover rounded-full -ml-3 first:ml-0'
                style={{
                  backgroundImage: `url(${
                    token.networkType === 'exchange'
                      ? staticData.getExchangeTokenLogo(token.symbol)
                      : staticData.getTokenLogo(
                          token.rootAddress,
                          token.isNative
                        )
                  })`,
                }}
              ></div>
              {token.network && token.network !== 'everscale' && (
                <div
                  className='w-3 h-3 bg-cover rounded-full -ml-2 mt-4'
                  style={{
                    backgroundImage: `url(${staticData.getNetworkLogo(
                      token.network,
                      token.networkType ?? 'network'
                    )})`,
                  }}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className='flex items-center text-sm gap-1 truncate'>
        {tokens.map((token, index) => (
          <span key={index} className='truncate uppercase'>
            {index !== 0 && ' + '}
            {token.symbol}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tokens;
