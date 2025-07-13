import { Textarea } from '@/shared/ui/textarea'
import { useHomePageModel } from './model/homePageModel'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Check, Copy } from 'lucide-react'
import DraggableTootlip from '@/shared/ui/draggableTooltip'
import { TranslationHistoryPopover } from '@/features/translate-history/ui'

export const HomePage = () => {
	const data = useHomePageModel()
	const {
		text,
		error,
		setText,
		copiedInput,
		handleCopyInput,
		handleTextSelect,
		selection,
		textareaRef,
	} = data

	return (
		<>
			{error && (
				<Alert variant='destructive'>
					<AlertTitle>Ошибка</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<div className='max-w-xl mx-auto mt-20 p-4 space-y-4'>
				<div className='relative'>
					{selection && <DraggableTootlip text={selection} />}

					<div className='flex justify-end my-2'>
						<TranslationHistoryPopover />
					</div>

					<Textarea
						ref={textareaRef}
						className='pb-8'
						placeholder='Введите текст'
						value={text}
						onChange={e => setText(e.target.value)}
						onSelect={handleTextSelect}
					/>
					{text && (
						<button
							className='absolute bottom-1 right-1 p-1 z-10'
							onClick={handleCopyInput}
							aria-label='Копировать текст'
						>
							{copiedInput ? (
								<Check className='h-5 w-5 text-green-500' />
							) : (
								<Copy className='h-5 w-5' />
							)}
						</button>
					)}
				</div>
			</div>
		</>
	)
}
