import axios from './axiosInstance';
import { ChatContextType, DrillDownDimensionType, HistoryType, MsgDataType, ParseDataType, SearchRecommendItem } from '../common/type';
import { QueryDataType } from '../common/type';

const DEFAULT_CHAT_ID = 0;

const prefix = '/api';

export function searchRecommend(queryText: string, chatId?: number, domainId?: number) {
  return axios.post<Result<SearchRecommendItem[]>>(`${prefix}/chat/query/search`, {
    queryText,
    chatId: chatId || DEFAULT_CHAT_ID,
    domainId,
  });
}

export function chatQuery(queryText: string, chatId?: number, domainId?: number, filters?: any[]) {
  return axios.post<Result<MsgDataType>>(`${prefix}/chat/query/query`, {
    queryText,
    chatId: chatId || DEFAULT_CHAT_ID,
    domainId,
    queryFilters: filters ? {
      filters
    } : undefined,
  });
}

export function chatParse(queryText: string, chatId?: number, domainId?: number, filters?: any[]) {
  return axios.post<Result<ParseDataType>>(`${prefix}/chat/query/parse`, {
    queryText,
    chatId: chatId || DEFAULT_CHAT_ID,
    domainId,
    queryFilters: filters ? {
      filters
    } : undefined,
  });
}

export function chatExecute(queryText: string,  chatId: number, parseInfo: ChatContextType ) {
  return axios.post<Result<MsgDataType>>(`${prefix}/chat/query/execute`, {
    queryText,
    chatId: chatId || DEFAULT_CHAT_ID,
    parseInfo,
  });
}

export function switchEntity(entityId: string, domainId?: number, chatId?: number) {
  return axios.post<Result<any>>(`${prefix}/chat/query/switchQuery`, {
    queryText: entityId,
    domainId,
    chatId: chatId || DEFAULT_CHAT_ID,
  });
}

export function queryData(chatContext: ChatContextType) {
  return axios.post<Result<QueryDataType>>(`${prefix}/chat/query/queryData`, chatContext);
}

export function queryContext(queryText: string, chatId?: number) {
  return axios.post<Result<ChatContextType>>(`${prefix}/chat/query/queryContext`, {
    queryText,
    chatId: chatId || DEFAULT_CHAT_ID,
  });
}

export function querySuggestionInfo(domainId: number) {
  return axios.get<Result<any>>(`${prefix}/chat/recommend/${domainId}`);
}

export function getHistoryMsg(current: number, chatId: number = DEFAULT_CHAT_ID, pageSize: number = 10) {
  return axios.post<Result<HistoryType>>(`${prefix}/chat/manage/pageQueryInfo?chatId=${chatId}`, {
    current,
    pageSize,
  });
}

export function queryMetricInfo(data: any) {
  return axios.get(`/semantic/metric/getMetric/${data.classId}/${data.uniqueId}`);
}

export function getRelatedDimensionFromStatInfo(data: any) {
  return axios.get(
    `/semantic/metric/getRelatedDimensionFromStatInfo/${data.classId}/${data.uniqueId}`,
  );
}

export function getMetricQueryInfo(data: any) {
  return axios.get<any>(
    `/openapi/bd-bi/api/polaris/intelligentQuery/getMetricQueryInfo/${data.classId}/${data.metricName}`
  );
}

export function saveConversation(chatName: string) {
  return axios.post<Result<any>>(`${prefix}/chat/manage/save?chatName=${chatName}`);
}

export function getAllConversations() {
  return axios.get<Result<any>>(`${prefix}/chat/manage/getAll`);
}

export function queryEntities(entityId: string | number, domainId: number) {
  return axios.post<Result<any>>(`${prefix}/chat/query/choice`, {
    entityId,
    domainId,
  });
}

export function updateQAFeedback(questionId: number, score: number) {
  return axios.post<Result<any>>(`${prefix}/chat/manage/updateQAFeedback?id=${questionId}&score=${score}&feedback=`);
}

export function queryDrillDownDimensions(domainId: number) {
  return axios.get<Result<{ dimensions: DrillDownDimensionType[] }>>(`${prefix}/chat/recommend/metric/${domainId}`);
}