/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Account {
  account: string;
  projectType: string;
}

export interface AccountHistoryRequest {
  accounts: string[];
  projects: string[] | null;
  /** @format int64 */
  timeSecBefore: number | null;
  /** @format int64 */
  timeSecFrom: number | null;
}

export interface AccountHistoryTokenData {
  account: string | null;
  currency: string;
  currencySymbol: string | null;
  /** Decimal value */
  currencyValue: string;
  elementType: string | null;
  /** @format int64 */
  timestamp: number;
  /** Decimal value */
  usdValue: string;
}

export interface Accounts {
  accounts: string[];
  projectType: string;
}

export interface AddIgnoredTimestampsRequest {
  timestamps: number[];
}

export interface AddIgnoredTimestampsResponse {
  errors: string[];
}

export type AllocationVesting = {
  total: SupplyToken;
  vesting: PeriodVesting[];
} | null;

export interface AutocompleteRequest {
  query: string;
}

export interface AutocompleteResponse {
  account: string;
  state: string;
}

export type Blockchain = Record<
  string,
  'unknown' | 'everscale' | EvmNetwork | 'solana'
>;

export interface BundleAccountDTO {
  address: string;
  email: string | null;
  githubUsername: string | null;
  memo: string | null;
  twitterUsername: string | null;
}

export interface BundleAccountRequest {
  accountAddress: string;
  accountMemo: string | null;
  bundleId: string;
}

export interface BundleAccountResponse {
  accounts: BundleAccountDTO[];
  bundleId: string;
}

export interface BundleDTO {
  id: string;
  name: string;
}

export interface BundleExchangeKeyDTO {
  exchange: string;
  id: string;
  memo: string;
  name: string;
}

export interface BundleExchangeKeyRequest {
  bundleId: string;
  exchangeKeyId: string;
}

export interface BundleExchangeKeyResponse {
  bundleId: string;
  exchangeKeys: BundleExchangeKeyDTO[];
}

export interface ChangeRoleToAddressRequest {
  address: string;
  role: string;
}

export interface ChangeRoleToAddressResponse {
  success: boolean;
}

export type Counterparty = {
  address: string;
  counterpartyType: CounterpartyType;
} | null;

/**
 * @example sender
 */
export enum CounterpartyType {
  Sender = 'sender',
  Recipient = 'recipient',
}

export interface EditBundleAccountRequest {
  accountMemo: string | null;
  bundleId: string;
  newAccountAddress: string;
  oldAccountAddress: string;
}

export interface EditBundleExchangeKeyRequest {
  bundleId: string;
  newExchangeKeyId: string;
  oldExchangeKeyId: string;
}

export interface EditBundleRequest {
  id: string;
  newName: string;
}

export interface EditExchangeKeyRequest {
  id: string;
  memo: string;
}

export interface ErrorResponse {
  errMsg: string;
  success: boolean;
}

/**
 * @example unknown
 */
export enum EvmNetwork {
  Unknown = 'unknown',
  Ethereum = 'ethereum',
  BnbChain = 'bnbChain',
  Fantom = 'fantom',
  Polygon = 'polygon',
  Avalanche = 'avalanche',
  Milkomeda = 'milkomeda',
}

export interface ExchangeDTO {
  apiGuideUri?: string | null;
  generateKeyUri: string;
  id: string;
  link: string;
  name: string;
  requiresPassphrase: boolean;
}

export interface ExchangeKeyBalanceDTO {
  available: string;
  currency: string;
  exchange: string;
  exchangeKey: string;
  reserved: string;
  usdPrice: string;
}

export interface ExchangeKeyDTO {
  exchange: string;
  id: string;
  memo: string;
  name: string;
}

export interface FarmingReward {
  /** Decimal value */
  entitledAmount: string;
  /** Decimal value */
  entitledUsdValue: string;
  /** Decimal value */
  farmDebtAmount: string;
  /** Decimal value */
  farmDebtUsdValue: string;
  rootAddress: string;
  symbol: string;
  /** Decimal value */
  vestedAmount: string;
  /** Decimal value */
  vestedUsdValue: string;
}

export interface GetAccountIlRequest {
  account: string;
  /** @format int64 */
  timeSecBefore: number | null;
  /** @format int64 */
  timeSecFrom: number | null;
}

export interface GetAccountIlResponse {
  ipls: Ipl[];
}

export interface GetPnlRequest {
  account: string;
  /** @format int64 */
  from: number | null;
  /** @format int64 */
  to: number | null;
}

export interface GetPnlResponse {
  account: string;
  pnls: Pnl[];
}

export interface HistoryItem {
  counterparty?: Counterparty;
  fee?: SupplyToken[];
  fromBlockchain: Blockchain;
  itemType: HistoryItemType;
  link: string;
  projectId: string | null;
  /** @format int64 */
  timestamp: number;
  toBlockchain: Blockchain;
  tokens: SupplyToken[];
  transactionHash: string;
  userAddress: string;
}

/**
 * @example unknown
 */
export enum HistoryItemType {
  Unknown = 'unknown',
  EverReceived = 'everReceived',
  EverSent = 'everSent',
  TokenBurnReverted = 'tokenBurnReverted',
  TokenSendReverted = 'tokenSendReverted',
  TokenMinted = 'tokenMinted',
  TokenBurned = 'tokenBurned',
  TokenReceived = 'tokenReceived',
  TokenSent = 'tokenSent',
  TokenMigration = 'tokenMigration',
  StakeBurn = 'stakeBurn',
  StakeFreeze = 'stakeFreeze',
  StakeUnlock = 'stakeUnlock',
  StakeWithdraw = 'stakeWithdraw',
  StakeLock = 'stakeLock',
  StakeDeposit = 'stakeDeposit',
  StakeClaim = 'stakeClaim',
  FarmingRewardDeposit = 'farmingRewardDeposit',
  FarmingClaim = 'farmingClaim',
  FarmingWithdraw = 'farmingWithdraw',
  FarmingDeposit = 'farmingDeposit',
  LpWithdraw = 'lpWithdraw',
  LpDeposit = 'lpDeposit',
  DexSwap = 'dexSwap',
  DexSwapFromEver = 'dexSwapFromEver',
  DexSwapToEver = 'dexSwapToEver',
  WeverUnwrap = 'weverUnwrap',
  EverWrap = 'everWrap',
  BridgeTransfer = 'bridgeTransfer',
  FarmingDepositWithAutoClaim = 'farmingDepositWithAutoClaim',
  FarmingWithdrawWithAutoClaim = 'farmingWithdrawWithAutoClaim',
  LpDepositWithAutoExchange = 'lpDepositWithAutoExchange',
}

export interface HistoryResponse {
  items: AccountHistoryTokenData[];
}

export interface Ipl {
  /** Decimal value */
  ipl: string;
  pool: string;
  /** @format int64 */
  timestamp: number;
}

export interface LaunchPool {
  allocationVesting: AllocationVesting;
  depositedToken: SupplyToken;
  poolAddress: string;
  /** Decimal value */
  totalUsdValue: string;
}

export type Liquidity = {
  supplyTokenList: SupplyToken[];
  /** Decimal value */
  totalUsdValue: string;
} | null;

export interface LockedDeposit {
  cumulativePart: SupplyToken;
  part: SupplyToken;
  /** Decimal value */
  share: string;
  /** @format int64 */
  unlockTime: number;
  vePart: VeToken;
}

export interface LoginRequest {
  address: string;
  publicKey: string;
  signature: string;
  /** @format uint64 */
  timestamp: number;
  walletType: string;
}

export interface NetworkDTO {
  id: string;
  link: string;
  name: string;
}

export interface NewBundleRequest {
  name: string;
}

export interface NewExchangeKeyRequest {
  /** @format string */
  apiKey: string;
  exchangeId: string;
  memo: string;
  /** @format string */
  passphrase: string | null;
  /** @format string */
  secretKey: string;
}

export interface PaginationRequest {
  /** @format int32 */
  skip?: number;
  /** @format int32 */
  take?: number | null;
}

export interface PeriodVesting {
  cumulativePart: SupplyToken;
  part: SupplyToken;
  /** Decimal value */
  share: string;
  /** @format uint32 */
  unfreezeTime: number;
}

export interface Pnl {
  /** Decimal value */
  pnl: string;
  /** @format int64 */
  timestamp: number;
}

export interface PoolInfo {
  poolAddress: string;
  poolType: PoolType;
  rewardTokenList?: FarmingReward[] | null;
  stakingRewardList?: StakingReward[] | null;
  supplyTokenList: SupplyToken[];
  /** Decimal value */
  totalUsdValue: string;
  unlockSchedule?: LockedDeposit[] | null;
  veTokenList?: VeToken[] | null;
}

/**
 * @example farmingPool
 */
export enum PoolType {
  FarmingPool = 'farmingPool',
  FarmingPoolV2 = 'farmingPoolV2',
  LiquidityPool = 'liquidityPool',
  Voting = 'voting',
  Staking = 'staking',
  Escrowing = 'escrowing',
}

export interface ProjectDTO {
  id: string;
  link: string;
  name: string;
  networkId: string;
}

export interface ProjectHistoryRequest {
  projectIds: string[];
  /** @format int64 */
  timeSecBefore: number | null;
  /** @format int64 */
  timeSecFrom: number | null;
}

export interface ProjectResponse {
  address: string;
  launchpools?: LaunchPool[];
  liquidity?: Liquidity;
  pools: PoolInfo[];
}

export interface ProjectUserDTO {
  /** @format int64 */
  updated: number | null;
  /** Decimal value */
  usdValue: string;
  userAddress: string;
}

export interface ProjectUsersRequest {
  pagination?: PaginationRequest;
  project: string;
}

export interface ProjectUsersResponse {
  items: ProjectUserDTO[];
  /** @format uint32 */
  total: number;
}

export interface ProjectWithStatsDTO {
  id: string;
  link: string;
  name: string;
  networkId: string;
  /** Decimal value */
  totalTvlUsdValue: string;
  /** @format int64 */
  totalUsers: number;
}

export interface RetrieveHistoryRequest {
  /** @format int64 */
  before: number | null;
  /** @format int64 */
  limit: number;
  userAddresses: string[] | null;
}

export interface RetrieveHistoryResponse {
  canLoadMore: boolean;
  items: HistoryItem[];
}

export interface SingleId {
  id: string;
}

export interface StakingReward {
  /** Decimal value */
  amount: string;
  /** @format int32 */
  decimals: number;
  symbol: string;
  /** Decimal value */
  usdValue: string;
}

export interface SupplyToken {
  /** Decimal value */
  amount: string;
  /** @format int32 */
  decimals: number;
  rootAddress: string;
  symbol: string;
  /** Decimal value */
  usdValue: string;
}

export interface TokenBalance {
  /** Decimal value */
  amount: string;
  network: string;
  rootAddress: string | null;
  standard: string | null;
  symbol: string;
  /** Decimal value */
  usdPrice: string;
}

export interface UserRole {
  address: string;
  code: string;
  description: string | null;
}

export interface UserRolesResponse {
  roles: UserRole[];
}

export interface VeToken {
  /** Decimal value */
  amount: string;
  symbol: string;
}

export interface WalletBalance {
  address: string;
  tokenBalances: TokenBalance[];
}

export interface WalletRequest {
  address: string;
  networkId: string;
}

export interface WalletsRequest {
  addresses: string[];
  networkId: string;
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://api.snipa.finance',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: Iterable<any> =
        property instanceof Array ? property : [property];
      // @ts-ignore
      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      // @ts-ignore
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snipa backend
 * @version 0.0.1
 * @baseUrl https://api.snipa.finance
 *
 * API server for Snipa integration
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary Authorize address and return JWT
     * @request POST:/login
     */
    loginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<string, ErrorResponse>({
        path: `/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags projects
     * @name ProjectsCreate
     * @summary Get projects list by network Id
     * @request POST:/projects
     */
    projectsCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<ProjectDTO[], ErrorResponse>({
        path: `/projects`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectWithStatsCreate
     * @summary Get project with stats by project Id
     * @request POST:/project-with-stats
     */
    projectWithStatsCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<ProjectWithStatsDTO, ErrorResponse>({
        path: `/project-with-stats`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectListWithStatsCreate
     * @summary Get projects list with stats by network Id
     * @request POST:/project-list-with-stats
     */
    projectListWithStatsCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<ProjectWithStatsDTO[], ErrorResponse>({
        path: `/project-list-with-stats`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  networks = {
    /**
     * No description
     *
     * @tags networks
     * @name NetworkListList
     * @summary Get supported networks list
     * @request GET:/network-list
     */
    networkListList: (params: RequestParams = {}) =>
      this.request<NetworkDTO[], ErrorResponse>({
        path: `/network-list`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  account = {
    /**
     * No description
     *
     * @tags account
     * @name AccountDataCreate
     * @summary Get protocol data by address
     * @request POST:/account-data
     */
    accountDataCreate: (data: Account, params: RequestParams = {}) =>
      this.request<ProjectResponse, ErrorResponse>({
        path: `/account-data`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AccountsDataCreate
     * @summary Get protocol data by array of addresses
     * @request POST:/accounts-data
     */
    accountsDataCreate: (data: Accounts, params: RequestParams = {}) =>
      this.request<ProjectResponse[], ErrorResponse>({
        path: `/accounts-data`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name WalletAssetsCreate
     * @summary Get wallet assets
     * @request POST:/wallet-assets
     */
    walletAssetsCreate: (data: WalletRequest, params: RequestParams = {}) =>
      this.request<WalletBalance, ErrorResponse>({
        path: `/wallet-assets`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name WalletsAssetsCreate
     * @summary Get wallets assets
     * @request POST:/wallets-assets
     */
    walletsAssetsCreate: (data: WalletsRequest, params: RequestParams = {}) =>
      this.request<WalletBalance[], ErrorResponse>({
        path: `/wallets-assets`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  bundle = {
    /**
     * No description
     *
     * @tags bundle
     * @name BundleListList
     * @summary Get list of bundles per address
     * @request GET:/bundle-list
     * @secure
     */
    bundleListList: (params: RequestParams = {}) =>
      this.request<BundleDTO[], ErrorResponse>({
        path: `/bundle-list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name BundleAccountListCreate
     * @summary Get list of addresses in particular bundle
     * @request POST:/bundle-account-list
     * @secure
     */
    bundleAccountListCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<BundleAccountResponse, ErrorResponse>({
        path: `/bundle-account-list`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name BundleExchangeKeyListCreate
     * @summary Get list of exchange keys in particular bundle
     * @request POST:/bundle-exchange-key-list
     * @secure
     */
    bundleExchangeKeyListCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<BundleExchangeKeyResponse, ErrorResponse>({
        path: `/bundle-exchange-key-list`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name AddBundleCreate
     * @summary Add new bundle
     * @request POST:/add-bundle
     * @secure
     */
    addBundleCreate: (data: NewBundleRequest, params: RequestParams = {}) =>
      this.request<BundleDTO, ErrorResponse>({
        path: `/add-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name EditBundleCreate
     * @summary Edit existing bundle
     * @request POST:/edit-bundle
     * @secure
     */
    editBundleCreate: (data: EditBundleRequest, params: RequestParams = {}) =>
      this.request<BundleDTO, ErrorResponse>({
        path: `/edit-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name DeleteBundleCreate
     * @summary Delete bundle
     * @request POST:/delete-bundle
     * @secure
     */
    deleteBundleCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<string | null, ErrorResponse>({
        path: `/delete-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name AddAccountToBundleCreate
     * @summary Add account to bundle
     * @request POST:/add-account-to-bundle
     * @secure
     */
    addAccountToBundleCreate: (
      data: BundleAccountRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/add-account-to-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name EditAccountInBundleCreate
     * @summary Edit account in bundle
     * @request POST:/edit-account-in-bundle
     * @secure
     */
    editAccountInBundleCreate: (
      data: EditBundleAccountRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/edit-account-in-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name RemoveAccountFromBundleCreate
     * @summary Remove account from bundle
     * @request POST:/remove-account-from-bundle
     * @secure
     */
    removeAccountFromBundleCreate: (
      data: BundleAccountRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/remove-account-from-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name AddExchangeKeyToBundleCreate
     * @summary Add exchange key to bundle
     * @request POST:/add-exchange-key-to-bundle
     * @secure
     */
    addExchangeKeyToBundleCreate: (
      data: BundleExchangeKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/add-exchange-key-to-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name EditExchangeKeyInBundleCreate
     * @summary Edit exchange key in bundle
     * @request POST:/edit-exchange-key-in-bundle
     * @secure
     */
    editExchangeKeyInBundleCreate: (
      data: EditBundleExchangeKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/edit-exchange-key-in-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags bundle
     * @name RemoveExchangeKeyFromBundleCreate
     * @summary Remove exchange key from bundle
     * @request POST:/remove-exchange-key-from-bundle
     * @secure
     */
    removeExchangeKeyFromBundleCreate: (
      data: BundleExchangeKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<string | null, ErrorResponse>({
        path: `/remove-exchange-key-from-bundle`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name ProjectUsersCreate
     * @summary Get project users list by project Id
     * @request POST:/project-users
     */
    projectUsersCreate: (
      data: ProjectUsersRequest,
      params: RequestParams = {}
    ) =>
      this.request<ProjectUsersResponse, ErrorResponse>({
        path: `/project-users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  history = {
    /**
     * No description
     *
     * @tags history
     * @name HistoryCreate
     * @summary Retrieve history by user prior the date specified
     * @request POST:/history
     */
    historyCreate: (data: RetrieveHistoryRequest, params: RequestParams = {}) =>
      this.request<RetrieveHistoryResponse, ErrorResponse>({
        path: `/history`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags history
     * @name AccountHistoryCreate
     * @summary Retrieve state of account for specified time interval and project
     * @request POST:/account-history
     */
    accountHistoryCreate: (
      data: AccountHistoryRequest,
      params: RequestParams = {}
    ) =>
      this.request<HistoryResponse, ErrorResponse>({
        path: `/account-history`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags history
     * @name ProjectHistoryCreate
     * @summary Retrieve state of projects for specified time interval
     * @request POST:/project-history
     */
    projectHistoryCreate: (
      data: ProjectHistoryRequest,
      params: RequestParams = {}
    ) =>
      this.request<HistoryResponse, ErrorResponse>({
        path: `/project-history`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags history
     * @name ImpermanentLossCreate
     * @summary Get account impermanent loss values for each timestamp in range
     * @request POST:/impermanent-loss
     */
    impermanentLossCreate: (
      data: GetAccountIlRequest,
      params: RequestParams = {}
    ) =>
      this.request<GetAccountIlResponse, ErrorResponse>({
        path: `/impermanent-loss`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags history
     * @name ProfitLossCreate
     * @summary Get account profit loss values
     * @request POST:/profit-loss
     */
    profitLossCreate: (data: GetPnlRequest, params: RequestParams = {}) =>
      this.request<GetPnlResponse, ErrorResponse>({
        path: `/profit-loss`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  autocomplete = {
    /**
     * No description
     *
     * @tags autocomplete
     * @name SearchCreate
     * @request POST:/search
     */
    searchCreate: (data: AutocompleteRequest, params: RequestParams = {}) =>
      this.request<AutocompleteResponse[], ErrorResponse>({
        path: `/search`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  exchange = {
    /**
     * No description
     *
     * @tags exchange
     * @name ExchangeListList
     * @summary Get list of supported exchanges
     * @request GET:/exchange-list
     * @secure
     */
    exchangeListList: (params: RequestParams = {}) =>
      this.request<ExchangeDTO[], ErrorResponse>({
        path: `/exchange-list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags exchange
     * @name ExchangeKeyListList
     * @summary Get list of exchange keys for particular user
     * @request GET:/exchange-key-list
     * @secure
     */
    exchangeKeyListList: (params: RequestParams = {}) =>
      this.request<ExchangeKeyDTO[], ErrorResponse>({
        path: `/exchange-key-list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags exchange
     * @name AddExchangeKeyCreate
     * @summary Add new exchange key
     * @request POST:/add-exchange-key
     * @secure
     */
    addExchangeKeyCreate: (
      data: NewExchangeKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<ExchangeKeyDTO, ErrorResponse>({
        path: `/add-exchange-key`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags exchange
     * @name EditExchangeKeyCreate
     * @summary Edit existing exchange key
     * @request POST:/edit-exchange-key
     * @secure
     */
    editExchangeKeyCreate: (
      data: EditExchangeKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<ExchangeKeyDTO, ErrorResponse>({
        path: `/edit-exchange-key`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags exchange
     * @name DeleteExchangeKeyCreate
     * @summary Delete exchange key
     * @request POST:/delete-exchange-key
     * @secure
     */
    deleteExchangeKeyCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<string | null, ErrorResponse>({
        path: `/delete-exchange-key`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags exchange
     * @name ExchangeKeyBalancesCreate
     * @summary Get balances for particular exchange key
     * @request POST:/exchange-key-balances
     * @secure
     */
    exchangeKeyBalancesCreate: (data: SingleId, params: RequestParams = {}) =>
      this.request<ExchangeKeyBalanceDTO[], ErrorResponse>({
        path: `/exchange-key-balances`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags admin
     * @name AddRoleCreate
     * @summary Bind role to address
     * @request POST:/add-role
     * @secure
     */
    addRoleCreate: (
      data: ChangeRoleToAddressRequest,
      params: RequestParams = {}
    ) =>
      this.request<ChangeRoleToAddressResponse, ErrorResponse>({
        path: `/add-role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name RemoveRoleCreate
     * @summary Delete role to address binding
     * @request POST:/remove-role
     * @secure
     */
    removeRoleCreate: (
      data: ChangeRoleToAddressRequest,
      params: RequestParams = {}
    ) =>
      this.request<ChangeRoleToAddressResponse, ErrorResponse>({
        path: `/remove-role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name ListRoleCreate
     * @summary List all address roles
     * @request POST:/list-role
     * @secure
     */
    listRoleCreate: (params: RequestParams = {}) =>
      this.request<UserRolesResponse, ErrorResponse>({
        path: `/list-role`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags admin
     * @name AddIgnoredTimeCreate
     * @summary Add timestamp that will be ignored in project-history response
     * @request POST:/add-ignored-time
     * @secure
     */
    addIgnoredTimeCreate: (
      data: AddIgnoredTimestampsRequest,
      params: RequestParams = {}
    ) =>
      this.request<AddIgnoredTimestampsResponse, ErrorResponse>({
        path: `/add-ignored-time`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
