import { useAppDispatch, useAppSelector } from '@/app/providers/redux/hooks'
import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Textarea } from '@/shared/ui/textarea'
import { format } from 'date-fns'
import { History, Trash2 } from 'lucide-react'
import { selectHistoryItems } from '../redux'
import { clearHistory, removeFromHistory } from '../redux/slice'

export const TranslationHistoryPopover = () => {
	const dispatch = useAppDispatch()
	const history = useAppSelector(selectHistoryItems)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>
					<History className='mr-2 h-4 w-4' />
					История
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[420px] p-3'>
				<div className='flex justify-between items-center mb-2'>
					<h2 className='text-base font-semibold'>История переводов</h2>
					{history.length > 0 && (
						<Button
							onClick={() => dispatch(clearHistory())}
							variant='ghost'
							className='cursor-pointer text-red-500 hover:text-red-500'
						>
							Очистить всё
						</Button>
					)}
				</div>

				{history.length === 0 ? (
					<div className='text-center text-muted-foreground text-sm'>
						История пуста
					</div>
				) : (
					<ScrollArea className='h-[360px] pr-2'>
						<div className='space-y-3'>
							{history.map(item => (
								<div
									key={item.id}
									className='relative group border rounded p-3 shadow-sm'
								>
									<div className='flex items-center justify-between mb-2'>
										<div className='text-xs text-muted-foreground mb-2'>
											{format(item.createdAt, 'dd.MM.yyyy HH:mm')}
										</div>
										<Button
											variant='ghost'
											onClick={() => dispatch(removeFromHistory(item.id))}
											aria-label='Удалить'
											className='cursor-pointer'
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>

									<div className='flex items-start gap-2 mb-1'>
										<img
											src={`/languages/${item.sourceLang}.svg`}
											alt={item.sourceLang}
											className='h-5 w-5'
										/>
										<Textarea
											readOnly
											className='text-sm text-foreground break-words resize-none min-h-[80px]'
											value={item.text}
										/>
									</div>

									<div className='flex items-center justify-center'>⬇️</div>

									<div className='flex items-start gap-2'>
										<img
											src={`/languages/${item.targetLang}.svg`}
											alt={item.targetLang}
											className='h-5 w-5'
										/>
										<Textarea
											readOnly
											className='text-sm break-words resize-none min-h-[80px]'
											value={item.translatedText}
										/>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				)}
			</PopoverContent>
		</Popover>
	)
}
