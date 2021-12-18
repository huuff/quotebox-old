import { Quote } from './quote';
import { QuoteProvider } from './quote-provider';
import { ProviderName } from '@/quotes/get-provider';
import axios from 'axios';

interface QuotableQuote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

function fromQuotable(quote: QuotableQuote): Quote {
  return {
    id: quote._id,
    contents: quote.content,
    author: quote.author,
    tags: quote.tags,
  };
}

export class QuotableQuoteProvider implements QuoteProvider {
  public readonly name: ProviderName = ProviderName.quotable;
  private readonly URL = 'https://api.quotable.io/random';

  async random(): Promise<Quote> {
    return axios.get<QuotableQuote>(this.URL).then(response => fromQuotable(response.data));
  }

  async byAuthor(author: string): Promise<Quote> {
    return axios.get<QuotableQuote>(this.URL, { params: { author } }).then(response => fromQuotable(response.data));
  }

  async byTag(tag: string): Promise<Quote> {
    return axios.get<QuotableQuote>(this.URL, { params: { tags: tag } }).then(response => fromQuotable(response.data));
  }

  async byWork(_: string): Promise<Quote> {
    throw new Error('Method not implemented.');
  }
}
